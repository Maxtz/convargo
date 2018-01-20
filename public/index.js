'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];



//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//console.log(truckers);
//console.log(deliveries);
//console.log(actors);


function calcul_prix()
{
for(var i=0;i<deliveries.length;i++) 
{
     for(var j=0;j<truckers.length;j++)

     {
       if(deliveries[i].truckerId==truckers[j].id)
      {
       deliveries[i].price=deliveries[i].distance*truckers[j].pricePerKm+deliveries[i].volume*truckers[j].pricePerVolume;
      }
     }

}
}

function reduction()
{
for(var i=0;i<deliveries.length;i++) 
{

if (deliveries[i].volume>5 && deliveries[i].volume<=10)
{
  deliveries[i].price=deliveries[i].price*0.9;
}
else if (deliveries[i].volume>10 && deliveries[i].volume<=25)
{
  deliveries[i].price=deliveries[i].price*0.7;
}

else if (deliveries[i].volume>50)
{
  deliveries[i].price=deliveries[i].price*0.5;
}

}

}



function commission_done()
{
 for(var i=0;i<deliveries.length;i++)

     {
      //console.log(0.15*deliveries[i].price);
      deliveries[i].commission.insurance=0.15*deliveries[i].price;

      deliveries[i].commission.treasury=Math.floor(deliveries[i].distance/500);
      deliveries[i].commission.convargo=deliveries[i].price*0.3-deliveries[i].commission.treasury-deliveries[i].commission.insurance;

     }

}

function reduction_franchise()
{
  for(var i=0;i<deliveries.length;i++)
 {
  if (deliveries[i].deductibleReduction==true) 
    {deliveries[i].franchise=200;
      deliveries[i].commission.convargo=deliveries[i].volume;
      }
      else
      {
        deliveries[i].franchise=1000;
      }

  }
}


function payment_debit_credit()
{
for(var i=0;i<deliveries.length;i++) 
{
     for(var j=0;j<actors.length;j++)

     {
       if(deliveries[i].id==actors[j].deliveryId)
      {
       actors[j].payment[0].amount=deliveries[i].price;
       actors[j].payment[1].amount=deliveries[i].price*0.7;//trucker
       actors[j].payment[2].amount=deliveries[i].commission.treasury;//treasury
       actors[j].payment[3].amount=deliveries[i].commission.insurance;//insurance
       actors[j].payment[4].amount=deliveries[i].commission.convargo;//convargo
       
      }
     }

}
}




calcul_prix();
reduction();
commission_done();
reduction_franchise();
payment_debit_credit();
console.log(deliveries);
console.log(actors);

