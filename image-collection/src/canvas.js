import { DownloadImage } from "./images";

export default class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.imageMaxWidth = 300;
        this.span = 5;
        this.bottomSpan = 50;
        this.imgs = [];
        this.buttons = [];
        this.rowsHeights = [];

        const resize = () => this.ResizeCanvas(this.canvas.parentElement.clientWidth);

        window.addEventListener('resize', function (event) {
            resize();
        }, true);

        this.canvas.width = this.GetMaxWidth(this.canvas.parentElement.clientWidth);
    }

    GetMaxWidth(newWidth) {
        return Math.floor(newWidth / (this.imageMaxWidth + this.span)) * (this.imageMaxWidth + this.span);
    }

    ResizeCanvas(newWidth, newHeight = null) {
        const dif = newWidth - this.canvas.width;
        if (dif < 0 && this.canvas.width > this.imageMaxWidth + this.span || dif > 200) {
            this.canvas.width = this.GetMaxWidth(newWidth);
            const totalHeight = this.GetYPos(this.rowsHeights.length);
            this.ResizeCanvas(this.canvas.width, totalHeight);

            this.rowsHeights = [];
            this.imgs.forEach((value) => {
                this.DrawImage(value);
            });
        }

        if (newHeight != null && this.canvas.height != newHeight) {
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.canvas.height = newHeight;
            this.ctx.putImageData(imageData, 0, 0);
        }
    }

    CalculateRowHeight(rowIndex) {
        const rowCount = this.rowImagesCount;
        return Math.max(...this.imgs
            .slice(rowIndex * rowCount, (1 + rowIndex) * rowCount)
            .map(img => img.height * this.imageMaxWidth / img.width)
        );
    }

    GetYPos(rowIndex) {
        if (rowIndex > this.rowsHeights.length) {
            this.rowsHeights[rowIndex - 1] = this.CalculateRowHeight(rowIndex - 1);
        }

        return this.rowsHeights.slice(0, rowIndex).reduce((sum, operand) => sum + operand + this.span + this.bottomSpan, 0);
    }

    get rowImagesCount() {
        return Math.floor(this.canvas.width / this.imageMaxWidth);
    }

    DrawImage(img) {
        const arrIndex = this.imgs.indexOf(img);
        const rowIndex = Math.floor(arrIndex / this.rowImagesCount);

        let height = img.height * this.imageMaxWidth / img.width;
        const y = this.GetYPos(rowIndex);

        if (height + y > this.canvas.height) {
            this.ResizeCanvas(this.canvas.width, height + y);
        }

        if ((rowIndex + 1) > this.rowsHeights.length || height > this.rowsHeights[rowIndex]) {
            this.rowsHeights[rowIndex] = height;
            this.buttons
                .slice(rowIndex * this.rowImagesCount, (1 + rowIndex) * this.rowImagesCount)
                .map((btn) => {
                    const rect = btn.getBoundingClientRect();
                    this.PlaceButton(btn, rect.left + rect.width / 2, y + this.rowsHeights[rowIndex] + this.span);
                })
        }

        const x = (this.imageMaxWidth + this.span) * (arrIndex % this.rowImagesCount);

        this.ctx.drawImage(img, x, y, this.imageMaxWidth, height);
        this.PlaceButton(this.buttons[arrIndex], x + this.imageMaxWidth / 2, y + this.rowsHeights[rowIndex] + this.span);
    }

    PlaceButton(btn, x, y) {
        btn.setAttribute('class', 'controls');
        const width = btn.getBoundingClientRect().width;
        btn.style = "top: " + y + "px;" + "left: " + (x - width / 2) + 'px;';
    }

    async AddImageToCanvas(img) {
        this.imgs.push(img);
        this.AddButtonToDocument(img);
        this.DrawImage(img);
    }

    AddButtonToDocument(img) {
        const parent = document.getElementById('controls-menu');
        const button = document.createElement('button');
        button.textContent = 'Download';

        button.addEventListener('click', () => {
            DownloadImage(img);
        });

        parent.appendChild(button);
        this.buttons.push(button);
    }
}