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
                sh "mkdir -p /var/jenkins_home/export_html_builds/gateway"
                sh "rm -rf $JENKINS_HOME/export_html_builds/$FOLDER_NAME/*"
                sh "cp -rf /opt/configuration/tryhardship/* ."
                sh "cp -rf $WORKSPACE/* $JENKINS_HOME/export_html_builds/$FOLDER_NAME"
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