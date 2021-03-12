let actions = [];

// EX: actions.???.push(index, value)
const visualize = (type, array, speed = 1, reducer = null) => 
{
    const algorithm = algs[type];
    algorithm(array);
    const arrayBars = document.getElementsByClassName('array-bar');
    actions.forEach((e, i) =>
    {
        setTimeout(() =>
        {
            const bar = arrayBars[e[0]];
            bar.style.height = `${e[1] / 13}vh`;
            bar.style.backgroundColor = 'Gold';
            setTimeout(() =>
            {
                bar.style.backgroundColor = 'DodgerBlue';
            }, 100)


        }, i * speed)
    })
    setTimeout(() =>
    {
        Array.from(arrayBars).forEach((e, i) =>
        {
            setTimeout(() =>
            { 
                e.style.backgroundColor = 'LawnGreen'
            }, i * 2)
        });
        if (reducer) reducer();
    }, (actions.length * speed) + 100);
    actions = [];
}

const swap = (arr, a, b) => {
    actions.push([a, arr[b]]);
    actions.push([b, arr[a]]);
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

const bubbleSort = array =>
{
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
        for (let x = 0; x < newArray.length - i - 1; x++) {
            if (newArray[x] > newArray[x + 1]) {
                swap(newArray, x, x + 1);
            }
        }
    }
}

const selectionSort = arr =>
{
    const array = [...arr];
    console.log(array)
    for (let i = 0; i < array.length; i++)
    {
        let min;
        for (let x = i; x < array.length; x++)
        {
            if (!min || array[x] < array[min]) min = x;
        }
        swap(array, min, i);
    }
    return array;
}

const insertionSort = arr =>
{
    const array = [...arr];
    for (let i = 0; i < array.length; i++) {
        for (let x = i; x > 0; x--)
        {
            if (array[x] < array[x - 1])
            {
                swap(array, x, x - 1);
            }
        }
    }
    return array;
}

const algs = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
}

export default visualize;