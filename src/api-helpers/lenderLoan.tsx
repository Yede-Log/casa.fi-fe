const lenderLoanService =  {

    getAllLoans: (userAddress:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan/"+ userAddress;

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getAllLoanOffers: (userAddress:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-offers/";

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getAllLoanApplications: (userAddress:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-application/"+ userAddress;

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getMyLoans: (user:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "user/myloans/" + user;

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getAllChains: (user:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "chains/" + user;

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getLoanOfferById: (id:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-offers/" +id

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    getLoanById: (id:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loans/" + id 

        const prom = new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    updateLoanApplication: (id:String) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-application/" + id 

        const prom = new Promise(function (resolve, reject) {
            fetch(url,{
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "REJECTED"
                    }), 
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
        return prom;
    },

    createLoanOffer: (body:any) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-offers"

        const prom = new Promise(function (resolve, reject) {
            fetch(url,{
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body), 
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    updateKYC: (body:any) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "user/verify"

        const prom = new Promise(function (resolve, reject) {
            fetch(url,{
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body), 
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    },

    createLoanApplication: (body:any) => {
        
        const url = process.env.NEXT_PUBLIC_API_URL + "loan-application/apply"

        const prom = new Promise(function (resolve, reject) {
            fetch(url,{
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body), 
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        });

        return prom;
    } 
}

export default lenderLoanService;