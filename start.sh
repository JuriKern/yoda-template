#!/bin/sh

kill -9 $(ps aux | grep 'node' | awk '{print $2}') >> /dev/null 2>&1
foreman s