pipeline {

    agent any

    stages {

        stage('Build Docker Image') {

            steps {

                sh 'docker build -t student-scheduler .'

            }
        }

        stage('Run Docker Container') {

            steps {

                sh 'docker stop student-container || true'
                sh 'docker rm student-container || true'

                sh 'docker run -d -p 5000:5000 --name student-container student-scheduler'

            }
        }
    }
}