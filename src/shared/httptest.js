import {baseurl} from './baseurl';

export const showuser = ()=>{
      
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRmZTQyODI0MWViMjAwMjQwYjZiMTAiLCJpYXQiOjE1OTkwNzEyNzJ9.P6Cz53cnjU4iJ7qfTvJn-ohhGC0OLEs-LmTF5Uqe2Mc");
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
      };
     
      return fetch(baseurl+"showUser", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error 1', error));    
} 

export const userattempt = async(obj)=>{

      var user = await showuser();
      
      var raw={
          user:user.user.userName,  
          attempt:obj
      };

      var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: {
                  "Content-Type": "application/json"
            },
            redirect: 'follow'
      };
      console.log(requestOptions.body);

      return fetch(baseurl+"addattempt", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
      
} 


export const getquestion = async(sub)=>{

      var user = await showuser();
      console.log(user.user);
      var raw={
            user:user.user.userName,
            grade:user.user.class,
            sub:sub
      };

      var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: {
                  "Content-Type": "application/json"
            },
            redirect: 'follow'
      };

      console.log(requestOptions.body);

      return fetch(baseurl+"getquestion", requestOptions)
      .then(response => response.json())
      .then(result => {return result;})
      .catch(error => console.log('error 2', error));
}
