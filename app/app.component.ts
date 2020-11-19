import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  editing = false;

  user = {
    name: "Ted"
  };

  form = new FormGroup({
    name: new FormControl(this.user.name, Validators.required)
  });

  templateValue = "template value";

  componentWrappedValue = "component wrapped value";
}
