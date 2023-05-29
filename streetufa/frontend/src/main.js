import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

//const cors = require('cors');
//const corsOptions ={
//    origin:'http://localhost:8080', 
//    credentials:'include',            //access-control-allow-credentials:true
//    optionSuccessStatus:200
//}

createApp(App).use(router).mount("#app");

//axios.defaults.baseURL = "http://127.0.0.1:8000";
