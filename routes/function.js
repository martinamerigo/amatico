const Station = require('../model/station');
const Transition = require('../model/transition');

const calculatedistance = async (a,b) => {
    var distance;
    const stafromobject = await Station.findOne({
        name:a
    });
    const statoobject = await Station.findOne({
        name:b
    })
     //const rute from 
    //const rute to
    //const sta from
    //const sta to

    const rutefrom = stafromobject.routes;
    const ruteto = statoobject.routes;
    var stafrom = stafromobject.sta;
    var stato = statoobject.sta;

    let jarak=[];
    
    //if rute from = rute too, jarak0 = sta to-sta from
    if(rutefrom===ruteto){
        let jarak0 = stato-stafrom;
        jarak.push(jarak0);
    } else {
        //const min rute
        //const max rute
        const rutemin = Math.min(rutefrom,ruteto);
        const rutemax = Math.max(rutefrom,ruteto);
        const transisistring = num.toString(rutemin)+num.toString(rutemin);
        const transisinum = Number(transisistring);

        const transisiobject = await Transisi.findOne({
            trans:transisinum,
            indicatoroptional1:1
        });

        const indicatoropti2=transisiobject.indicatoroptional2;

        const nametransisifrom = transisiobject.from;
        const nametransisito = transisiobject.to;

        const statransisifromobject = await Station.findOne({
            name:nametransisifrom
        });
        const statransisitoobject = await Station.findOne({
            name:nametransisito
        });

        const statransisifrom = statransisifromobject.sta;
        // const routestransisifrom = statransisifromobject.routes;
        const statransisito = statransisitoobject.sta;
        // const routestransisito = statransisitoobject.routes;

        let jarak1 = Math.abs(statransisifrom-stafrom);
        let jarak2 = Math.abs(statransisito-stato);

        let jarak3 = transisiobject.distance;

        let jarakopti1 = jarak1+jarak2+jarak3;

        if(indicatoropti2===1){
            const transisiobjectopti2 = await Transisi.findOne({
                trans:transisinum,
                indicatoroptional2:2
            });
            const statransisi2from = transisiobjectopti2.sta;
            const statransisi2to = transisiobjectopti2.sta;
            let jarak7 = transisiobjectopti2.distance;
            let jarak5 = Math.abs(statransisi2from-stafrom);
            let jarak6 = Math.abs(statransisi2to-stato);
            let jarakopti2=jarak5+jarak6+jarak7;
        } else {
            let jarakopti2=1000000000;
        }
        let jarak0 = Math.min(jarakopti1,jarakopti2);
    };
    let jarak0 = Math.abs(jarak[0]);
    console.log('cekjarak0 '+jarak0);


    //const transisi = min&max
    //const sta transisi from (syarat tranisis dan indicatoropsi<2)
    //const sta transisi to (syarat tranisis dan indicatoropsi<2)

    //const jarak 1 from sta from - sta transisi from
    //const jarak 2 to sta to - sta transisi to

    //const jarak 3 transisi 

    //check transisi indicator opsi =1
    //kalo 1, 
    //const sta transisi 2 from ((syarat tranisis dan indicatoropsi=2))
    //const sta transisi 2 to ((syarat tranisis dan indicatoropsi=2))
    //const jarak 7 transisi 2 ((syarat tranisis dan indicatoropsi=2))
     //const jarak 5 from sta from - sta transisi 2 from
    //const jarak 6 to sta to - sta transisi 2 to

    //check min (jarak 1 + 2 + 3),(jarak 5+6+7)

    
    return jarak0;
};

const calculatecarbon = async (a) => {
    var carbonkg=1;
    return carbonkg;
};

const calculateprice = async (a) => {
    var price=1;
    return price;
};


module.exports = { 
    calculatedistance,
    calculatecarbon,
    calculateprice 
};
