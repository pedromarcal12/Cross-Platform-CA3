const electron = require("electron");
      const { ipcRenderer } = electron;

      ipcRenderer.send("bill:request:list");

      ipcRenderer.on("bill:response:list", (event, bills) => {
        const listDiv = document.getElementById("list");
        bills.forEach(bill => {
          const billDiv = document.createElement("div");
          const UnitsParagraph = document.createElement("p");
          UnitsParagraph.innerHTML = `Units: ${bill.Units}`;
          const PeriodParagraph = document.createElement("p");
          PeriodParagraph.innerHTML = `Phone Period: ${bill.Period}`;
          const dateParagraph = document.createElement("p");
          dateParagraph.innerHTML = `Date: ${bill.date}`;
          
          const hr = document.createElement("hr");

          billDiv.appendChild(UnitsParagraph);
          billDiv.appendChild(PeriodParagraph);
          billDiv.appendChild(dateParagraph);
          billDiv.appendChild(doneParagraph);
          billDiv.appendChild(hr);

          listDiv.append(billDiv);
        });
      });