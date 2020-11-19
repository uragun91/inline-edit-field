import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

// material
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContenteditableValueAccessor } from "./contenteditable-value-accessor/contenteditable-value-accessor";
import { EditableInputFieldComponent } from './editable-input-field/editable-input-field.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, ContenteditableValueAccessor, EditableInputFieldComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
