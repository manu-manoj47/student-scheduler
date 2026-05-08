pipeline {
    agent any

    stages {
        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build and Deploy Full Stack') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Show Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }
}