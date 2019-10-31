import { NgModule, Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { BrowserModule } from "@angular/platform-browser";

import Swal from 'sweetalert2'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'File type checking';
    public showflag = false;
    public items: any = [];
    constructor(private http: Http) {

    }

    ngOnInit() {

    }

    loadFileTypes() {

        alert('Load file types');


        const payload = { filepath: "/home/sherin_ag/project_express/zip_file.zip" };


        // let url = `http://localhost:8081/filesTypes`;
        let url = `http://localhost:3000/payTypes`;

        this.http.post(url, payload).subscribe(res => {
            this.items = JSON.parse(res['_body']);
            this.showflag = true;
        }
        );
    }

    isChecked(event, item) {

        // console.log(this.items);
        if (event.target.checked) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].filename == item.filename) {
                    this.items[i].selected = true;
                }
            }
        } else {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].filename == item.filename) {
                    this.items[i].selected = false;
                }
            }
        }
        // console.log(this.items);

    }

    checkAll(event) {

        if (event.target.checked) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].selected = true;
            }
        }
        else {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].selected = false;
            }
        }

    }

    writeFileTypes() {

        console.log(this.items);

        var cflag: boolean = false;
        for (var i = 0; i < this.items.length; i++) {
            console.log(this.items[i].selected);
            if (this.items[i].selected === true) {
                console.log("Entred");
                cflag = true;
            }
        }
        console.log(cflag);
        if (cflag === false) {
            //alert("Please select the  file type!");
            Swal.fire('Oops...', 'Please choose the file type!', 'error');
            return false;
        }
        else {
            alert('Write selected file Types')
            const payload = this.items;
            console.log(payload);
            // let url = `http://localhost:8081/writefilesTypes`;
            let url = `http://localhost:3000/payTypes/writefilesTypes`;
            this.http.post(url, payload).subscribe(res => {
                console.log(res['_body']);
                alert("Writing finished");
            }
            );
        }

    }

    generatePdf() {

        var arr = [{ prjId: "", prj: "", Type: "#1 Cochran", Date: "", Num: "" },
        { prjId: 230482046, prj: "#1 Cochran", Type: "Invoice", Date: "07-12-2019", Num: "T5917" },
        { prjId: 230482182, prj: "#1 Cochran", Type: "Invoice", Date: "07-12-2019", Num: "T5919" },
        { prjId: 210639333, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4181" },
        { prjId: 210640692, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4256" },
        { prjId: 210641170, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4300" },
        { prjId: 210641290, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4257" },
        { prjId: 210640465, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4255" },
        { prjId: 210641051, prj: "#1 Cochran", Type: "Invoice", Date: "07-15-2019", Num: "T4298" },
        { prjId: 230482210, prj: "#1 Cochran", Type: "Invoice", Date: "07-31-2019", Num: "T5918" },
        { prjId: 230482075, prj: "#1 Cochran", Type: "Invoice", Date: "07-31-2019", Num: "T5916" },
        { prjId: "", prj: "", Type: "Total     #1 Cochran", Date: "", Num: "" },
        { prjId: "", prj: "", Type: "Total", Date: "", Num: "" }];

        console.log(arr);
        var result = [['project_id', 'type', 'num']].concat(arr.map(({ prjId, Type, Num }) => [(prjId) ? prjId : 'Nil', (Type) ? Type : 'Nil', (Num) ? Num : 'Nil']));
        result.splice(-2, 2);
        console.log(result);

        const aging_data = {
            content: [
                {
                    style: 'tableExample',
                    table: {
                        body: result
                    }
                }]
        }
        pdfMake.createPdf(aging_data).download();

    }


}