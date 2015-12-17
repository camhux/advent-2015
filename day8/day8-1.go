package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

var input []byte
var lines [][]byte

func init() {
	var err error
	input, err = ioutil.ReadFile(os.Args[1])
	if err != nil {
		fmt.Printf("Failed to read file %s\n", os.Args[1])
		os.Exit(1)
	}

	lines = bytes.Split(input, []byte("\n"))
}

var codeCt int
var runeCt int

func main() {

	for _, line := range lines {
		line := string(line)
		codeCt += len(line)

		unquoted, err := strconv.Unquote(line)
		if err != nil {
			fmt.Printf("Failed to unquote line %q", line)
			os.Exit(1)
		}

		runeCt += len(unquoted)
	}
	fmt.Printf("Code count: %v\nRune count: %v\nDifference: %v\n", codeCt, runeCt, codeCt-runeCt)
}
