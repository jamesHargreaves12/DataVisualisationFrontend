How To:

Add a new dataset:
- Create folder in data/objFiles, data/details, data/objFileCompressedwith the dataset name
- Add heatmap to data/highResHeatMaps
- Add obj files to data/objFiles/<name>/
- Add obj compressed files to data/objFiles/<name>
- Add details files to data/details/<name>/ (you can use makeDeatilsFiles.py)
- Changes to Datasets.ts
    - import details file to variable (used for type safety)
    - Add record to FILENAME_TO_DETAILS map
    - Add value to DatasetIds enum
    - Add heat record to HEATMAPS map
    - Add item to DATASETS list