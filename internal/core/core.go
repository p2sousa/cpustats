package core

import (
	"math"
	"runtime"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/wailsapp/wails"
)

type Stats struct {
	log *wails.CustomLogger
}

type CpuStats struct {
	Usage   int
	Count   int
	Os      string
	Arch    string
	Swap    *mem.SwapMemoryStat
	Mem     *mem.VirtualMemoryStat
	CpuInfo []cpu.InfoStat
}

func (s *Stats) WailsInit(runtime *wails.Runtime) error {
	s.log = runtime.Log.New("Stats")
	go func() {
		for {
			runtime.Events.Emit("cpu_stats", s.GetStats())
			time.Sleep(1 * time.Second)
		}
	}()

	return nil
}

func (s *Stats) GetStats() CpuStats {
	return CpuStats{
		Usage:   s.GetCPUUsage(),
		Count:   s.GetCPUCount(),
		Os:      runtime.GOOS,
		Arch:    runtime.GOARCH,
		Swap:    s.GetSwapMemory(),
		Mem:     s.GetMemory(),
		CpuInfo: s.GetCPUInfo(),
	}
}

func (s *Stats) GetCPUInfo() []cpu.InfoStat {
	cpuInfo, err := cpu.Info()
	if err != nil {
		s.log.Errorf("Unable to retrive cpu information!")
	}
	return cpuInfo
}

func (s *Stats) GetCPUCount() int {
	count, err := cpu.Counts(true)
	if err != nil {
		s.log.Errorf("Unable to retrive cpu count!")
		return 0
	}
	return count
}

func (s *Stats) GetCPUUsage() int {
	percent, err := cpu.Percent(time.Second, false)
	if err != nil {
		s.log.Errorf("Unable to retrive cpu usage!")
		return 0
	}
	return int(math.Round(percent[0]))
}

func (s *Stats) GetSwapMemory() *mem.SwapMemoryStat {
	sms, err := mem.SwapMemory()
	if err != nil {
		s.log.Errorf("Unable to retrive swap memory!")
		return &mem.SwapMemoryStat{}
	}
	return sms
}

func (s *Stats) GetMemory() *mem.VirtualMemoryStat {
	ms, err := mem.VirtualMemory()
	if err != nil {
		s.log.Errorf("Unable to retrive memory!")
	}
	return ms
}
