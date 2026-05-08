pipeline {
    agent any

    stages {

        stage('Stop Old Containers') {
            steps {
                sh 'docker rm -f student-backend || true'
                sh 'docker rm -f student-frontend || true'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t student-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t student-frontend ./frontend'
            }
        }

        stage('Run Backend Container') {
            steps {
                sh 'docker run -d -p 5000:5000 --name student-backend student-backend'
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh 'docker run -d -p 5173:5173 --name student-frontend student-frontend'
            }
        }

        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }
}