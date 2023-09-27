pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build-prod'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm /var/www/html/fm/*'
                sh 'cp /var/lib/jenkins/workspace/finance-manager-frontend/dist/finance-manager-frontend/* /var/www/html/fm'
            }
        }
    }
}