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

export const getsubject = async()=>{

      var user = await showuser();

      var grade=user.user.class;

      return fetch(baseurl+"getSubjects/"+grade+"/")
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}


export const getchapter = async(sub)=>{

      var user = await showuser();

      var grade=user.user.class;
      
      return fetch(baseurl+"getChapter/"+grade+"/"+sub)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}

export const gettopic = async(sub,chapter)=>{

      var user = await showuser();

      var grade=user.user.class;
      
      return fetch(baseurl+"getSubjects/"+grade+"/"+sub+"/"+chapter)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}

export const getsubjectaccuracy = async(sub)=>{

      var user = await showuser();
      
      var raw={
          user:user.user.userName,  
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

      return fetch(baseurl+"getsubjectaccuracy", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));

}

export const getchapteraccuracy = async(sub,chapter)=>{

      var user = await showuser();
      
      var raw={
          user:user.user.userName,  
          sub:sub,
          chapter:chapter
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

      return fetch(baseurl+"getchapteraccuracy", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}

export const getsubjectpractice = async(sub)=>{

      var user = await showuser();
      
      var raw={
          user:user.user.userName,  
          sub:sub,
          grade:user.user.class
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

      return fetch(baseurl+"getsubjectpractice", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));

}

export const getchapterpractice = async(sub,chapter)=>{

      var user = await showuser();
      
      var raw={
          user:user.user.userName,  
          sub:sub,
          chapter:chapter,
          grade:user.user.class
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

      return fetch(baseurl+"getchapterpractice", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}
