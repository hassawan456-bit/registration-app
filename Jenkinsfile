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
                // Root folder ya server folder jahan bhi test run karna ho
                bat 'npm test'
            }
        }
       stage('Deploy to Vercel') {
    steps {
        withCredentials([string(credentialsId: 'vercel-cicid-project', variable: 'VERCEL_TOKEN')]) {
            dir('client') {
                // Yahan variable ka naam VERCEL_TOKEN aayega jo upar define kiya hai
                bat "npx vercel --prod --token %VERCEL_TOKEN% --yes"
            }
        }
    }
}
