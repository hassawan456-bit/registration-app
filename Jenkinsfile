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
        stage('Install Client Dependencies') {
            steps {
                dir('client') {
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
                    bat "npx vercel@latest link --yes --project cicd-project --token %VERCEL_TOKEN%"
                    bat "npx vercel@latest pull --yes --environment=production --token %VERCEL_TOKEN%"
                    bat "npx vercel@latest build --prod --token %VERCEL_TOKEN%"
                    bat "npx vercel@latest deploy --prebuilt --prod --token %VERCEL_TOKEN%"
                }
            }
        }
    }
}
