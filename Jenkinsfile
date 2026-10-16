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
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    dir('client') {
                        // Yahan secret variable use hoga, token hardcode nahi karna
                        bat "npx vercel --prod --token %vercel-cicid-project% --yes"
                    }
                }
            }
        }
    }
}
