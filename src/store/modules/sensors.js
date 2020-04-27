export default{
    state:{
        sensors:[]
    },
    mutations:{
        setSensors:(state,sensors)=>{
            state.sensors=sensors;
        }
    },
    actions:{
        fetchSensors({commit}){
            return new Promise((resolve,reject)=>{
                window.axios.get('/api/sensor/')
                    .then(res=>{
                        commit('setSensors',res.data.result)
                        resolve(res.data.result)
                    }).catch(error=>{
                        reject(error)
                    })
            });
        }
    },
    getters:{
        allSensors:state=>state.sensors
    }
}
