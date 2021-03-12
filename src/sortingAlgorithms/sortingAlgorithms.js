let actions = {
    merge: [],
    bubble: []
}

// EX: actions.???.push(index, value)
const visualizeAlt = (type, speed = 1, reducer = null) =>
{
    let action = actions[type];
    const array = document.getElementsByClassName('array-bar');
    action.forEach((e, i) =>
    {
        setTimeout(() =>
        {
            const bar = array[e[0]];
            bar.style.height = `${e[1] / 13}vh`;
            bar.style.backgroundColor = 'white';
            setTimeout(() =>
            {
                bar.style.backgroundColor = 'blue';
            }, 100)


        }, i * speed)
    })
    actions[type] = [];
    setTimeout(() =>
    {
        Array.from(array).forEach(e => e.style.backgroundColor = 'LawnGreen');
        if (reducer) reducer();
    }, (action.length * speed) + 100);
}

function merge(left, right, leftIdx, rightIdx) {
    let arr = []
    let rightCounter = 0;
    let leftCounter = 0;
    let leftSum = 0;
    let rightSum = 0;
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        leftSum = leftIdx + leftCounter;
        rightSum = rightIdx + rightCounter;

        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())
            leftCounter++;
        } else {
            arr.push(right.shift())
            rightCounter++;
        }
    }
    for (let i = 0; i <= arr.length; i++) {
        actions.merge.push([i, arr[i]]);
    }
    if (left.length) {
        for (let i = 1; i < left.length; i++) {
            const num = i + leftSum;
            actions.merge.push([num, left[num]])
        }
    } else if (right.length) {
        for (let i = 1; i < right.length; i++) {
            const num = i + rightSum;
            actions.merge.push([num, right[num]])
        }
    }
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right]
}

function mergeSort(array, index = 0) {
    const half = Math.floor(array.length / 2);

    // Base case or terminating case
    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half)
    const halfIdx = (index + half);
    return merge(mergeSort(left), mergeSort(array, halfIdx), index, halfIdx)
}

const swap = (arr, a, b) => {
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
                actions.bubble.push([x, newArray[x + 1]]);
                actions.bubble.push([x + 1, newArray[x]])
                swap(newArray, x, x + 1);
            }
        }
    }
}

const sorting = {
    visualizeAlt,
    mergeSort,
    bubbleSort
};
export default sorting;