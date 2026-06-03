package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func generatorCheck(n int) int {
	if n < 0 {
		return 0
	}
	stringify := strings.Split(strconv.Itoa(n), "")
	var sum = 0

	for _, value := range stringify {
		val, err := strconv.Atoi(value)
		if err != nil {
			return 0
		}
		sum = sum + val
	}

	total := n + sum

	return total
}

func interval(start int, end int) int {
	var allNumbers []int
	var numbers []int
	result := 0
	for i := start; i <= end; i++ {
		allNumbers = append(allNumbers, i)
		total := generatorCheck(i)
		numbers = append(numbers, total)
	}

	for _, value := range allNumbers {
		if !slices.Contains(numbers, value) {
			result = result + value
		}
	}

	return result
}

func main() {
	numbers := interval(1, 5000)

	fmt.Printf("total self-number : %+v", numbers)
}
