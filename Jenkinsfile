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
                sh "mkdir -p $JENKINS_HOME/export_html_builds/$FOLDER_NAME"
                sh "rm -rf $JENKINS_HOME/export_html_builds/$FOLDER_NAME/*"
                sh "cp -rf $WORKSPACE/* $JENKINS_HOME/export_html_builds/$FOLDER_NAME"
            }
        }
        stage('Copy configuration') {
            environment {
                FOLDER_NAME="tryhardship"
            }
            steps {
                sh "cp -rf /opt/configuration/$FOLDER_NAME/* $JENKINS_HOME/export_html_builds/$FOLDER_NAME"
            }
        }
    }
}