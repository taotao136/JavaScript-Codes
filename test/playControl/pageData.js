var pageData = [

{
    "no": "000",
    "name": "channel",
    "prog": "program"
}, {
    "no": "001",
    "name": "channel",
    "prog": "program"
}, {
    "no": "002",
    "name": "channel",
    "prog": "program"
}, {
    "no": "003",
    "name": "channel",
    "prog": "program"
}, {
    "no": "004",
    "name": "channel",
    "prog": "program"
}/*, {
    "no": "005",
    "name": "channel",
    "prog": "program"
}, {
    "no": "006",
    "name": "channel",
    "prog": "program"
}, {
    "no": "007",
    "name": "channel",
    "prog": "program"
}, {
    "no": "008",
    "name": "channel",
    "prog": "program"
}, {
    "no": "009",
    "name": "channel",
    "prog": "program"
}, {
    "no": "010",
    "name": "channel",
    "prog": "program"
}, {
    "no": "011",
    "name": "channel",
    "prog": "program"
}, {
    "no": "012",
    "name": "channel",
    "prog": "program"
}, {
    "no": "013",
    "name": "channel",
    "prog": "program"
}, {
    "no": "014",
    "name": "channel",
    "prog": "program"
}, {
    "no": "015",
    "name": "channel",
    "prog": "program"
}, {
    "no": "016",
    "name": "channel",
    "prog": "program"
}, {
    "no": "017",
    "name": "channel",
    "prog": "program"
}, {
    "no": "018",
    "name": "channel",
    "prog": "program"
}, {
    "no": "019",
    "name": "channel",
    "prog": "program"
}, {
    "no": "020",
    "name": "channel",
    "prog": "program"
}, {
    "no": "021",
    "name": "channel",
    "prog": "program"
}, {
    "no": "022",
    "name": "channel",
    "prog": "program"
}, {
    "no": "023",
    "name": "channel",
    "prog": "program"
}, {
    "no": "024",
    "name": "channel",
    "prog": "program"
}, {
    "no": "025",
    "name": "channel",
    "prog": "program"
}, {
    "no": "026",
    "name": "channel",
    "prog": "program"
}, {
    "no": "027",
    "name": "channel",
    "prog": "program"
}, {
    "no": "028",
    "name": "channel",
    "prog": "program"
}, {
    "no": "029",
    "name": "channel",
    "prog": "program"
}, {
    "no": "030",
    "name": "channel",
    "prog": "program"
}, {
    "no": "031",
    "name": "channel",
    "prog": "program"
}, {
    "no": "032",
    "name": "channel",
    "prog": "program"
}, {
    "no": "033",
    "name": "channel",
    "prog": "program"
}, {
    "no": "034",
    "name": "channel",
    "prog": "program"
}, {
    "no": "035",
    "name": "channel",
    "prog": "program"
}, {
    "no": "036",
    "name": "channel",
    "prog": "program"
}, {
    "no": "037",
    "name": "channel",
    "prog": "program"
}, {
    "no": "038",
    "name": "channel",
    "prog": "program"
}, {
    "no": "039",
    "name": "channel",
    "prog": "program"
}, {
    "no": "040",
    "name": "channel",
    "prog": "program"
}, {
    "no": "041",
    "name": "channel",
    "prog": "program"
}, {
    "no": "042",
    "name": "channel",
    "prog": "program"
}, {
    "no": "043",
    "name": "channel",
    "prog": "program"
}, {
    "no": "044",
    "name": "channel",
    "prog": "program"
}, {
    "no": "045",
    "name": "channel",
    "prog": "program"
}, {
    "no": "046",
    "name": "channel",
    "prog": "program"
}, {
    "no": "047",
    "name": "channel",
    "prog": "program"
}, {
    "no": "048",
    "name": "channel",
    "prog": "program"
}, {
    "no": "049",
    "name": "channel",
    "prog": "program"
}*/

];





function generateObj(n, template) {

    var obj = [],
    	i = 0,
    	t = '',
    	prop = null;

    for (var i = 0; i < n; i++) {

        obj[i] = {};

        for ( prop in template ) {

            var t = '';

            if (i >= 0 && i < 10) {

                t = '00' + i;
            } else if (i >= 10 && i < 100) {

                t = '0' + i;
            } else {

                t = '' + i;
            }

            obj[i].no = t;
            obj[i][prop] = template[prop];
        }
    }
    return JSON.stringify(obj);
}