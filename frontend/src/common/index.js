const backendDomain = "http://localhost:8080"

const SummaryAPI = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    }, 
    
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user :{
        url : `${backendDomain}/api/user-details`,
        method : "get"
    }
}

export default SummaryAPI