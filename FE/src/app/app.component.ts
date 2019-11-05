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


        // const payload = { filepath: "/home/sherin_ag/project_express/customer-pay-type.zip" };
        // const payload = { filepath: "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883-20191023020002.zip" };
        // const payload = { filepath: "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883-20191023020002.zip" };
        const payload = { filepath: "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883.zip" };
        

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

}