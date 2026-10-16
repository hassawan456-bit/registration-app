pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'cicd-project', variable: 'VERCEL_TOKEN')]) {
                    dir('client') {
                        // Pehle Vercel CLI ko globally latest version par update/install karein
                        bat "npm install -g vercel@latest"
                        // Phir token ke sath deploy karein
                        bat "vercel --prod --token %VERCEL_TOKEN% --yes"
                    }
                }
            }
        }
    }
}
