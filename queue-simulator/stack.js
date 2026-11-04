
class Queue {
    constructor() {
        this.items = [];
        this.nextId = 0;
    }

    // Add element to the rear of the queue
    enqueue(element) {
        let newItem = {
            id: this.nextId++,
            value: element
        };

        this.items.push(newItem);

        console.log(`${element} added to queue`);
        return newItem;
    }

    // Remove element from the front of the queue
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        let deleteItem = this.items.shift();

        console.log(`${deleteItem.value} removed`);
        return deleteItem;
    }

    // Check the front element without removing it
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }

        console.log(`Front element is ${this.items[0].value}`);
        return this.items[0];
    }

    // Check if queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Check queue size
    size() {
        return this.items.length;
    }

    // Print queue elements
    print() {
        return this.items.map(item => item.value).join(' ');
    }

    // Clear queue
    clear() {
        this.items = [];
        console.log('Queue cleared..');
        return this.items;
    }
}

const queue = new Queue();
$(document).ready(function() {

    // ENQUEUE
    $("#btn_enqueue").on("click", function() {

        let input = $("#queue_data").val().trim();

        if (input === "") {
            alert("Please enter a value.");
            return;
        }

        let enqueue_data = queue.enqueue(input);

        $("#queue").append(
            `<div id="q${enqueue_data.id}" 
            class="row bg-primary push text-white border border-light p-2">
            ${enqueue_data.value}
            </div>`
        );

        $("#queue_data").val("");
    });

    // DEQUEUE
    $("#btn_dequeue").on("click", function() {

        let dequeue_data = queue.dequeue();

        if (dequeue_data === undefined) {
            alert("Queue is empty. Nothing to dequeue.");
            return;
        }

        $("#deleted").prepend(
            `<div class="row pop text-bg-danger border border-light p-2">
            ${dequeue_data.value}
            </div>`
        );

        $(`#q${dequeue_data.id}`).remove();
    });

    // PEEK
    $("#btn_peek").on("click", function() {

        let peek_data = queue.peek();

        if (peek_data === undefined) {
            alert("Queue is empty. Nothing to peek.");
            return;
        }

        let frontItem = $(`#q${peek_data.id}`);

        frontItem.removeClass("bg-primary").addClass("peek");

        setTimeout(function() {
            frontItem.removeClass("peek").addClass("bg-primary");
        }, 500);
    });

    // CLEAR
    $("#btn_clear").on("click", function() {

        queue.clear();

        $("#queue, #deleted").empty();
    });

});
