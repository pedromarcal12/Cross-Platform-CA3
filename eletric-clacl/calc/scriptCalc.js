window.start_loader = function() {
    const loader = document.getElementById('loader-holder')
    loader.style.display = 'flex';
}
window.end_loader = function() {
    const loader = document.getElementById('loader-holder')
    loader.style.display = 'none';
}

window.onload = function() {
    setTimeout(() => {
        end_loader()
    }, 500)

    const calcForm = document.getElementById('calculate-form')
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault()
        start_loader();
        const units = document.getElementById('units-amount').value;
        const vat = document.getElementById('value-vat').value =13.5;
        const days = document.getElementById('days-cal').value;
        var monthly = 0,
            vatInterest = 0,
            total = 0,
            totalInterest = 0,
            invoice = 0;
        invoice = (parseFloat(units) *  0.20 + (parseFloat(days) *0.04 )); //conta de  units * o dia
        vatInterest = parseFloat(invoice) * parseFloat(vat)  / 100; //conta de valor do vat
        total = parseFloat(invoice) ; //conta sem o vat
        totalInterest = parseFloat(invoice)  + parseFloat(vatInterest); //valor total com o vat
        setTimeout(() => {
            document.getElementById('qtd-units').textContent = parseFloat(units).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 })
            document.getElementById('value-of-vat').textContent = parseFloat(vat).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 }) + "%";
            document.getElementById('days-calc').textContent = parseFloat(days).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 }) + (days > 1 ? " Days." : "")
            document.getElementById('vat-pay').textContent = parseFloat(vatInterest).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 })
            document.getElementById('total-pay').textContent = parseFloat(total).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 })
            document.getElementById('total-interest').textContent = parseFloat(totalInterest).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 2 })
            document.getElementById('result').style.display = 'table';
            document.getElementById('reset-btn').style.display = 'block';
            end_loader()
        }, 500)

    })
    calcForm.addEventListener('reset', function(e) {
        start_loader();
        setTimeout(() => {
            document.getElementById('qtd-units').textContent = ""
            document.getElementById('value-of-vat').textContent = "13.5"
            document.getElementById('days-calc').textContent = ""
            document.getElementById('vat-pay').textContent = ""
            document.getElementById('total-pay').textContent = ""
            document.getElementById('total-interest').textContent = ""
            document.getElementById('result').style.display = 'none';
            document.getElementById('reset-btn').style.display = 'none';
            end_loader()
        }, 500)
    })
}

