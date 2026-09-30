pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jenkins-devops-lab'
        CONTAINER_NAME = 'jenkins-devops-app'
        APP_PORT = '3000'
    }

    stages {

        stage('Install & Test') {
            steps {
                echo 'Installing dependencies and running tests...'

                sh '''
                    docker run --rm \
                      -v "$PWD:/app" \
                      -w /app \
                      node:24-alpine \
                      sh -c "npm ci && npm test"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker rm -f ${CONTAINER_NAME} || true

                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      -p ${APP_PORT}:3000 \
                      ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying application...'

                sh '''
                    sleep 5
                    curl -f http://localhost:${APP_PORT}/health
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD pipeline completed successfully!'
        }

        failure {
            echo '❌ CI/CD pipeline failed!'
        }

        always {
            sh 'docker ps -a'
        }
    }
}