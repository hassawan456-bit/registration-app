// pipeline {
//     agent any
//     stages {
//         stage('Build') {
//             steps {
//                 echo 'Building the application...'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Running tests...'
//             }
//         }
//     }
// }

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
                // Root folder se test chalayen taake server modules access ho sakein
                bat 'npm test'
            }
        }
    }
}
