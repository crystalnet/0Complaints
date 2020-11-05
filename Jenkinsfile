pipeline {
      agent any
     /* environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }*/
  stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
            //sh 'echo test'
      }
   }

   stage('IOS Build') {
   steps {
      //sh 'ionic cordova build ios --release'
         sh 'echo --> ios release here'
     } 
  }

   stage('Android Build') {
   steps {
      sh 'ionic cordova build android'
   }
  }

   stage('APK Sign') {
   steps {
     // sh 'jarsigner -storepass initial01 -keystore keys/yourkey.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk 0Complaints'
         sh 'echo here the jar signer'
   }
   }

   stage('Stage Web Build') {
      steps {
        sh 'npm run build --prod'
    }
  }

   stage('Publish Firebase Web') {
      steps {
     // sh 'firebase deploy --token "Your Token Key"'
     ech 'Firebase deploy'
   }
  }

   stage('Publish iOS') {
      steps {
       echo "Publish iOS Action"
    }
   }

   stage('Publish Android') {
     steps {
    echo "Publish Android API Action"
   }
  }

 }
}
