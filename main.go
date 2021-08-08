package main

import (
	"cpustats/internal/core"
	_ "embed"

	"github.com/wailsapp/wails"
)

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

func basic() string {
	return "World!"
}

func main() {

	stats := &core.Stats{}

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "cpustats",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	app.Bind(stats)
	app.Bind(basic)
	app.Run()
}
