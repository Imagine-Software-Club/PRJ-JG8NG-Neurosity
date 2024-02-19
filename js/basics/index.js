const { Neurosity } = require("@neurosity/sdk");
const fs = require('fs');
const { from } = require('rxjs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { time } = require("console");
var nj = require('numjs');

/*Loads in the env variables for safe credentials storage */
/** In our case we have Device Id, email and password */
require("dotenv").config();

/*
Loading in command line arguments 
Use it for specifying which action you are doing when recording data
For example when doing HW you can run it with:
npm start -- --label=homework
Later the output file will be homework.csv
*/ 
const argv = yargs(hideBin(process.argv))
  .option('label', {
    alias: 'l',
    description: 'Label for the CSV file',
    type: 'string',
    default: 'output'
  })
  .help()
  .alias('help', 'h')
  .argv;

/**Neurosity API Auth Credentials */
const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

/**Verify ENV variables by trying to Log In */
const verifyEnvs =(email, password, deviceId) =>{
    const invalidEnv = (env) => {
        return env === "" || env === 0;
    };
    if (invalidEnv(email) || invalidEnv(password) || invalidEnv(deviceId)){
        console.error(
            "Please verify ENV variables. Quitting..."
        );
        process.exit(0);
    };
    
}

verifyEnvs(email, password, deviceId);
console.log(`${email} authenticating ${deviceId}`);

/**Neurosity Crown SDK device object 
 One object can only subscribe to one stream of data at the time
 Below you will see how
*/
const neurosity_kinesis = new Neurosity({
    deviceId
});
const neurosity_calm = new Neurosity({
    deviceId
});
const neurosity_focus = new Neurosity({
    deviceId    
});
const neurosity_data = new Neurosity({
    deviceId
});
const neurosity_filtered_data = new Neurosity({
    deviceId
});

const loginDevice =  (device, email, password) =>{
    device.login({
        email,
        password
    }).catch((error) => {
        console.log(error);
        throw new Error(error);
    });
}

const main = async () => {
    
    //You need to login each device in order to subscribe to data
    await loginDevice(neurosity_kinesis, email, password);
    await loginDevice(neurosity_calm, email, password);
    await loginDevice(neurosity_focus, email, password);
    await loginDevice(neurosity_data, email, password);
    await loginDevice(neurosity_filtered_data, email, password);

    console.log('Logged in');
    if(argv.label === ''){
        argv.label = 'output';
    }

    const filename_unfiltered = `data/${argv.label}_unfiltered.csv`;
    const filename_filtered = `data/${argv.label}_filtered.csv`;
    const filename_focus = `data/${argv.label}_focus.csv`

    async function appendToCsv(dataObj, filename) {

        const { data, info } = dataObj;
        let fileExists = fs.existsSync(filename);
        
        let csvContent = fileExists ? '' : info.channelNames.join(',') + '\n';
        let rows = [];
        
        let temp_row = []
        dataObj.data.forEach(array => {
                
            
            for(i=0; i < array.length; i++){
                try{
                
                    temp_row[i].push(array[i]);
                
                }catch(error){
                    temp_row[i] = [array[i]];
                }
            } 
            
           
           //  
            

            
        });
        temp_row.forEach(value => {
            csvContent += value.join(',') + '\n';
        });
        //console.log(rows);
        
        


        if (fileExists) {
            fs.appendFileSync(filename, csvContent);
        } else {
            fs.writeFileSync(filename, csvContent);
        }

    };

    async function appendToCsvFocus(data, filename){
        const {label, metric, probability, timestamp} = data;
        let fileExists = fs.existsSync(filename);
        //Append header if file does not exist otherwise set to empty string;
        let csvContent = fileExists ? '' : 'label,metric,probability,timestamp\n';

        // Convert milliseconds to hh:mm:ss
        let date = new Date(timestamp); 
        let formattedTime = date.toISOString().substring(11, 19);
      
        const rows = []
        csvContent += [label, metric,probability,formattedTime].join(',') + '\n';
        
        if (fileExists){
            fs.appendFileSync(filename, csvContent);
        }else{
            fs.writeFileSync(filename, csvContent);
        }
    }
    /*Stream of data for kinesis prediction for action rightIndexFinger
    Prints out the probability it thinks the user is thinking of specific kinesis
    For multiple     
    */ 
    neurosity_kinesis.predictions("rightIndexFinger").subscribe((prediction) => {
        //onsole.log("predictions", prediction);
    });
    neurosity_calm.calm().subscribe((calm) =>{
        //console.log(calm);
    });
    neurosity_focus.focus().subscribe((focus) =>{
        appendToCsvFocus(focus, filename_focus);
    });
    neurosity_data.brainwaves("rawUnfiltered").subscribe((data) => {

        appendToCsv(data, filename_unfiltered);
        
        
    });
    neurosity_filtered_data.brainwaves("raw").subscribe((data) =>{
        appendToCsv(data, filename_filtered);
    })

}

main();
