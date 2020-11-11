pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Log env') {
            steps {
                sh 'env'
            }
        }
        stage('Deploy front') {
            environment {
                FOLDER_NAME="tryhardship"
            }
            steps {
                sh "rm -rf $JENKINS_HOME/export_react_builds/$FOLDER_NAME/*"
                sh "cp -f /opt/configuration/tryhardship/* ."
                sh "cp -rf $WORKSPACE/* $JENKINS_HOME/export_react_builds/$FOLDER_NAME"
            }
        }
        stage('Copy configuration') {
            environment {
                FOLDER_NAME="tryhardship"
            }
            steps {
                sh "cp -f /opt/configuration/$FOLDER_NAME/* $JENKINS_HOME/export_react_builds/$FOLDER_NAME/js"
            }
        }
    }
}