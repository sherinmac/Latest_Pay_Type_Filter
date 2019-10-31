
var org=[];
var temp=[
{prjId: "", prj: "", Type: "#1 Cochran", Date: "", Num: ""},
{prjId: 230482046, prj: "#1 Cochran", Type: "Invoice", Date: "07-12-2019", Num: "T5917"},
{prjId: 230482182, prj: "#1 Cochran", Type: "Invoice", Date: "07-12-2019", Num: "T5919"},
{prjId: 210640692, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4256"},
{prjId: 210641051, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4298"},
{prjId: 210641170, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4300"},
{prjId: 210641290, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4257"},
{prjId: 210639333, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4181"},
{prjId: 210640465, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4255"},
{prjId: 230482075, prj: "#1 Cochran", Type: "Invoice", Date: "07-31-2019", Num: "T5916"},
{prjId: 230482210, prj: "#1 Cochran", Type: "Invoice", Date: "07-31-2019", Num: "T5918"}
];






var jav=  JSON.stringify(temp);

var ajav=jav.replace(/{/, '[');
var ajav=ajav.replace(/}/, ']');

console.log(ajav);