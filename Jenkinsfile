pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    BACKEND_IMAGE = 'opsdesk-backend:jenkins'
    FRONTEND_IMAGE = 'opsdesk-frontend:jenkins'
    FRONTEND_API_URL = 'http://localhost:30081'
  }

  parameters {
    booleanParam(
      name: 'DEPLOY_TO_MINIKUBE',
      defaultValue: false,
      description: 'Apply Kubernetes manifests to the currently configured Minikube cluster.'
    )
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend Install') {
      steps {
        dir('backend') {
          sh 'npm ci'
        }
      }
    }

    stage('Backend Syntax Check') {
      steps {
        dir('backend') {
          sh '''
            node --check src/server.js
            node --check src/config/db.js
            node --check src/routes/health.routes.js
            node --check src/routes/incident.routes.js
          '''
        }
      }
    }

    stage('Backend Dependency Audit') {
      steps {
        dir('backend') {
          sh 'npm audit --audit-level=high'
        }
      }
    }

    stage('Frontend Install') {
      steps {
        dir('frontend') {
          sh 'npm ci'
        }
      }
    }

    stage('Frontend Build') {
      steps {
        dir('frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Frontend Dependency Audit') {
      steps {
        dir('frontend') {
          sh 'npm audit --audit-level=high'
        }
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
          docker build -t ${BACKEND_IMAGE} ./backend
          docker build --build-arg VITE_API_BASE_URL=${FRONTEND_API_URL} -t ${FRONTEND_IMAGE} ./frontend
        '''
      }
    }

    stage('Kubernetes Manifest Render') {
      steps {
        sh '''
          kubectl kustomize k8s/base > rendered-base.yaml
          kubectl kustomize k8s/monitoring > rendered-monitoring.yaml
          cat rendered-base.yaml rendered-monitoring.yaml > rendered-manifests.yaml
          test -s rendered-manifests.yaml
          grep -q "namespace: opsdesk" rendered-manifests.yaml
          grep -q "namespace: monitoring" rendered-manifests.yaml
        '''
      }
      post {
        always {
          archiveArtifacts artifacts: 'rendered-*.yaml', fingerprint: true, allowEmptyArchive: true
          sh 'rm -f rendered-base.yaml rendered-monitoring.yaml rendered-manifests.yaml'
        }
      }
    }

    stage('Optional Minikube Deploy') {
      when {
        expression {
          return params.DEPLOY_TO_MINIKUBE
        }
      }
      steps {
        sh '''
          minikube image load ${BACKEND_IMAGE}
          minikube image load ${FRONTEND_IMAGE}
          kubectl apply -k k8s/base
          kubectl apply -k k8s/monitoring
          kubectl -n opsdesk rollout status deployment/backend --timeout=180s
          kubectl -n opsdesk rollout status deployment/frontend --timeout=180s
          kubectl -n opsdesk rollout status deployment/mongodb --timeout=180s
          kubectl -n monitoring rollout status deployment/prometheus --timeout=180s
          kubectl -n monitoring rollout status deployment/grafana --timeout=180s
        '''
      }
    }
  }

  post {
    success {
      echo 'OpsDesk Jenkins pipeline completed successfully.'
    }

    failure {
      echo 'OpsDesk Jenkins pipeline failed. Check the failed stage logs.'
    }

    always {
      cleanWs(deleteDirs: true, disableDeferredWipeout: true)
    }
  }
}
