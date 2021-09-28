function getWrappingWord(ctx, text, textAreaWidth) {
  var maxWidth = textAreaWidth;
  var lines = new Array();
  text = !!text ? text.toString() : '';
  var words = text.split(' ');

  var line = '';
  // Start calculation
  while (words.length > 0) {
    while (ctx.measureText(words[0]).width >= maxWidth) {
      var tmp = words[0];
      words[0] = tmp.slice(0, -1);
      if (words.length > 1) {
        words[1] = tmp.slice(-1) + words[1];
      } else {
        words.push(tmp.slice(-1));
      }
    }
    if (ctx.measureText(line + words[0]).width < maxWidth) {
      line += words.shift() + ' ';
    } else {
      lines.push(line);
      line = '';
    }
    if (words.length === 0) {
      lines.push(line);
    }
  }
  return lines;
}

export default {
  id: 'text-plugin',
  beforeDraw: function(chart) {
    //Get ctx from string
    var ctx = chart.chart.ctx;
    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 1.85;
    let fontStyle = chart.config.options.fontStyle;
    let widthAreaText = chart.innerRadius * 0.3;
    // //------------------------------------------------------
    // //------------Start text in circumference---------------
    // //------------------------------------------------------
    // if (chart.config.options.elements.circData.text) {
    //   let dataCirc = chart.config.options.elements.circData;

    //   //----------------Text 1 circumference----------------------
    //   ctx.fillStyle = dataCirc.color;
    //   let size = (chart.innerRadius * chart.innerRadius * Math.PI) / 4;

    //   let text = dataCirc.text;

    //   //---------------Separar texto en 2 partes--------------
    //   let textWords = text.split(' ');
    //   let wordsNumber = textWords.length;
    //   let text1 = '';
    //   let text2 = '';
    //   for (let i = 0; i < wordsNumber; i++) {
    //     if (i < 1) {
    //       text1 = `${text1} ${textWords[i]}`;
    //     } else {
    //       text2 = `${text2} ${textWords[i]}`;
    //     }
    //   }

    //   // let fontSizeToUse = size / 30 / text1.length;
    //   // ctx.font = `${fontSizeToUse}px ` + fontStyle; //---------Tamaño de letra y fuente (Deben ir juntos)
    //   var numRadsPerLetter = (0.2 * Math.PI) / text1.length; //---------Angulo que marcara el espacio entre letras
    //   let x = centerX,
    //     y = centerY,
    //     radius = chart.innerRadius + 20, //----------Radio de la curvatura que marcara el texto
    //     startRotation = 1.65 * Math.PI; //----------Posición de la circunferencia donde comienza a pintarse
    //   ctx.save();
    //   ctx.translate(x, y);
    //   ctx.rotate(startRotation);
    //   // fontSizeToUse = size / (text1.length * 20) / text1.length;
    //   ctx.font = `20px ` + fontStyle; //---------Tamaño de letra y fuente (Deben ir juntos)
    //   for (let i = 0; i < text1.length; i++) {
    //     ctx.save();
    //     ctx.rotate(i * numRadsPerLetter);

    //     ctx.fillText(text1[i], 0, -radius);
    //     ctx.restore();
    //   }
    //   ctx.restore();

    //   //----------------Text 2 circumference----------------------
    //   // let sidePadding = 20;
    //   // let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
    //   // let stringWidth = widthAreaText;
    //   // let elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

    //   // // Find out how much the font can grow in width.
    //   // let widthRatio = elementWidth / stringWidth;
    //   // let newFontSize = Math.floor(30 * widthRatio);
    //   size = (chart.innerRadius * chart.innerRadius * Math.PI) / 4;

    //   // Pick a new font size so it will not be larger than the height of label.
    //   // fontSizeToUse = size / 30 / text2.length;
    //   // console.log('Font antes:', ctx.font, size, chart.innerRadius, Math.PI);

    //   ctx.font = `9px ` + fontStyle; //---------Tamaño de letra y fuente (Deben ir juntos)
    //   console.log('Font despues:', ctx.font);
    //   startRotation = 1.5 * Math.PI; //----------Posición de la circunferencia donde comienza a pintarse
    //   radius = chart.innerRadius + 5; //----------Radio de la curvatura que marcara el texto
    //   numRadsPerLetter = (0.5 * Math.PI) / text2.length; //---------Angulo que marcara el espacio entre letras
    //   ctx.save();
    //   ctx.translate(x, y);
    //   ctx.rotate(startRotation);

    //   for (let i = 0; i < text2.length; i++) {
    //     ctx.save();
    //     ctx.rotate(i * numRadsPerLetter);

    //     ctx.fillText(text2[i], 0, -radius);
    //     ctx.restore();
    //   }
    //   ctx.restore();
    // }
    // //-----------------------------------------------------
    // //-------------End text in circumference---------------
    // //-----------------------------------------------------

    //-----------------------------------------------------
    //-----------------Start text in center----------------
    //-----------------------------------------------------
    if (chart.config.options.elements.center) {
      //Get options from the center object in options
      let centerConfig = chart.config.options.elements.center;
      let color = centerConfig.color || '#000';
      let sidePadding = centerConfig.sidePadding || 20;
      let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = '10px ' + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      let stringWidth = widthAreaText;
      let elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      let widthRatio = elementWidth / stringWidth;
      let newFontSize = Math.floor(9 * widthRatio);
      let elementHeight = chart.innerRadius * 2;
      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight) / 2;

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      //-------------Circle center------------------
      let circleConfig = chart.config.options.elements.circleCenter;
      if (circleConfig) {
        ctx.beginPath();
        ctx.shadowColor = circleConfig.shadowColor;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.arc(centerX, centerY, chart.innerRadius * 0.9, 0, 2 * Math.PI);
        ctx.fillStyle = circleConfig.bgColor;
        ctx.fill();
        //Reset value shadows
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      ctx.fillStyle = centerConfig.color || '#000';
      if (centerConfig.description) {
        let finalOffsetY = centerConfig.description !== ' ' ? 0 : 7;
        //------------Text center 1--------------------
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        ctx.fillStyle = color;
        let lines = getWrappingWord(ctx, centerConfig.title, chart.innerRadius);
        let centerYAux = centerY - lines.length * fontSizeToUse;
        centerYAux += finalOffsetY;
        //Draw text in center
        lines.forEach(function(line, i) {
          ctx.fillText(line, centerX, centerYAux + i * fontSizeToUse);
        });
        // ctx.fillText(centerConfig.title, centerX, centerY - fontSizeToUse / 2);

        //---------------Line center-----------------
        ctx.beginPath(); // Start a new path
        ctx.lineWidth = 4;
        ctx.strokeStyle = centerConfig.lineColor;
        ctx.moveTo(centerX - chart.innerRadius * 0.3, centerY + finalOffsetY); // Move the pen to (30, 50)
        ctx.lineTo(centerX + chart.innerRadius * 0.3, centerY + finalOffsetY); // Draw a line to (150, 100)
        ctx.stroke();

        //------------Text center 2--------------------
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        lines = getWrappingWord(ctx, centerConfig.description, chart.innerRadius);
        centerYAux = centerY + fontSizeToUse;
        //Draw text in center
        lines.forEach(function(line, i) {
          ctx.fillText(line, centerX, centerYAux + i * fontSizeToUse);
        });
        ctx.restore();
      } else {
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        let lines = getWrappingWord(ctx, centerConfig.title, chart.innerRadius);
        let centerYAux = centerY - (lines.length / 2) * fontSizeToUse;
        //Draw text in center
        lines.map((line, i) => {
          ctx.fillText(line, centerX, centerYAux + i * fontSizeToUse);
        });
      }
    }
    //-----------------------------------------------------
    //-----------------End text in center----------------
    //-----------------------------------------------------
  },
};
