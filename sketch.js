console.log('Loading data...');

let table;



const canvasWidth = 1400;
const canvasHeight = 1000; // ⚠️ size limit if too long
const xPosAxis1 = 20; // px
const xPosAxis2 = 1000; // px


// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;
  var currentTemp;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));


  // drawAxes();
  // drawAxesLabels();
}

function draw() {
  background('white');
  text('now',10,20);
  text('future', width-50, 20);
  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = round(table.get(i, 'Max_Temperature_of_Warmest_Month'));
    const futureMeanTemp = table.get(i, 'future_Max_Temperature_of_Warmest_Month');
    

    position = convertDegreesToPosition(meanTemp);
    futurePosition = convertDegreesToPosition(futureMeanTemp);
    
    currentTemp = (futurePosition - position)/ width * mouseX +position;
    addedTemp= (futureMeanTemp - meanTemp)/ width * mouseX;
   
    fill(mouseX/2,255-mouseX/2,255-mouseX/2);
    circle(mouseX, currentTemp, 20,20);
    drawLabelToday( city, meanTemp);
  }
}



function convertDegreesToPosition(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const position = map(temp, 0, 37, 1600, 30,true);
  return position;
}



// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions


function drawLabelToday(city, temp) {
  fill('black');
  const label = `${city}: ${temp + round(addedTemp)} °C`;
  text(label, mouseX + 10, currentTemp + 5);
}




