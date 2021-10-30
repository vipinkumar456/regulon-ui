import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  PipeTransform,
  Pipe,
} from "@angular/core";

@Directive({
  selector: "[appOnlyDecimals]",
})
export class OnlyDecimalsDirective {
  constructor(private el: ElementRef) {}

  @Input() allowMultiLine: boolean = false;
  @Input() allowNegative: boolean = false;
  @Input() allowDecimal: boolean = false;
  @Input() maxLength: number = 0;
  regex: RegExp;

  @HostListener("keypress", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    this.validate(event, event.key === "Enter" ? "\n" : event.key);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: Event) {
    const pastedText =
      ((<any>window).clipboardData &&
        (<any>window).clipboardData.getData("Text")) || // If IE, use window
      (<ClipboardEvent>event &&
        (<ClipboardEvent>event).clipboardData.getData("text/plain")); // Non-IE browsers
    this.validate(event, pastedText);
  }

  @HostListener("cut", ["$event"])
  onCut(event: Event) {
    this.validate(event, "");
  }

  ngAfterViewChecked() {
    // var num = theform.original.value, rounded = theform.rounded
    // console.log(this.el.nativeElement.value)
    // this.el.nativeElement.value?this.el.nativeElement.value = this.el.nativeElement.value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]:this.el.nativeElement.value='';
    // rounded.value = with2Decimals
    // this.el.nativeElement.value=Math.trunc(this.el.nativeElement.value * Math.pow(10, 2)) / Math.pow(10, 2)
  }

  validate(event: Event, text: string) {
    const txtInput = this.el.nativeElement;
    const newValue =
      txtInput.value.substring(0, txtInput.selectionStart) +
      text +
      txtInput.value.substring(txtInput.selectionEnd);
    if (!this.regex) {
      this.regex = <RegExp>(
        eval(
          "/^" +
            (this.allowNegative ? "-?" : "") +
            (this.allowDecimal ? "((\\d+\\.?)|(\\.?))\\d*" : "\\d*") +
            "$/g"
        )
      );
    }
    var lines = this.allowMultiLine ? newValue.split("\n") : [newValue];

    for (let line of lines) {
      let lineText = line.replace("\r", "");
      // let split = lineText.split(".");
      // if (split[1]) {
      //   if (split[1].length > 2) {
      //     event.preventDefault();
      //     return;
      //   }
      // }
      if (
        (this.maxLength && lineText.length > this.maxLength) ||
        !lineText.match(this.regex)
      ) {
        event.preventDefault();
        return;
      }
    }
  }
}


@Pipe({ name: "twoDecimals" })
export class TwoDecimals implements PipeTransform {
  transform(value): number {
    //  Math.floor(value);

    if (value != null && value != 0 && value != "") {
      // return parseInt(value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])
      // return Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
      let i = value.toString().indexOf(".");
      if (i > 0) {
        return parseFloat(value.toString().substr(0, i + 3));
      } else {
        return parseFloat(value.toString());
      }
    } else {
      return value;
    }
  }
}
