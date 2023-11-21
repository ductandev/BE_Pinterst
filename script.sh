#!/bin/bash
docker exec cons-be-pinterest bash -c 'git pull && exit' && docker restart cons-be-pinterest
