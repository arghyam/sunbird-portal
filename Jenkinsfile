#!groovy

node('master') {

    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Pre-Build'){

         sh('sudo ./installDeps.sh')

       }

       stage('Build'){
	sh('sudo ./build.sh')
       }

       stage('Docker-push') {

          withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'dockerpassword', usernameVariable:'dockerusername')]) {
           sh '''
               docker login -u $dockerusername -p $dockerpassword
              '''
            }
	   sh('sudo ./dockerPushToRepo.sh')
}

}


    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }

}

