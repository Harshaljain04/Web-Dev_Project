document.querySelectorAll(".svg-path").forEach((e) => {
  e.setAttribute("class", `svg-path ${e.id}`);
  e.addEventListener("mouseover", function () {
    window.onmousemove = function (j) {
      x = j.clientX;
      y = j.clientY;
      document.getElementById("name").style.top = y - 20 + "px";
      document.getElementById("name").style.left = x + 20 + "px";
      if (e.id=="Thiruvananthapuram" || e.id =="Pathanamthitta") {
       
      document.getElementById("name").style.fontSize =12 + "px";


        
      }
      else{
      document.getElementById("name").style.fontSize =20 + "px";


      }
    };
    // const classes = e.className.baseVal.replace(/ /g, ".");
    // document.querySelectorAll(`.${classes}`).forEach((country) => {
    //   country.style.fill = "red";
    // });
    document.getElementById("name").style.opacity = 1;

    document.getElementById("namep").innerText = e.id;
  });
  e.addEventListener("mouseleave", function () {
    // const classes = e.className.baseVal.replace(/ /g, ".");
    // document.querySelectorAll(`.${classes}`).forEach((country) => {
    //   country.style.fill = "blue";
    // });
    document.getElementById("name").style.opacity = 0;
  });

  // e.addEventListener("click", function () {
  //   getUser(e.id);
  // });
});



