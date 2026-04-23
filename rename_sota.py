import os
import re

search_dir = '/Users/favl/Desktop/quantX'
extensions = ('.ts', '.tsx', '.py', '.md', '.rs', '.json', '.sh')

for root, _, files in os.walk(search_dir):
    if 'node_modules' in root or '.git' in root or '.next' in root or 'ollama_data' in root or 'dist' in root or '.vscode' in root:
        continue
    for file in files:
        if file.endswith(extensions) and file != 'rename_sota.py':
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                # Prioritize explicit filename/component name imports
                new_content = re.sub(r'SOTASuperQuantPanel', 'InstitutionalSuperQuantPanel', new_content)
                new_content = re.sub(r'SotaBenchmarkDashboard', 'InstitutionalBenchmarkDashboard', new_content)

                # Then general text
                new_content = re.sub(r'SOTA', 'Institutional', new_content)
                new_content = re.sub(r'Sota', 'Institutional', new_content)
                new_content = re.sub(r'sota', 'institutional', new_content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Refactored: {path}")
            except Exception as e:
                print(f"Skipping {path}: {e}")

# Rename specific files to match React Component imports
try:
    os.rename('/Users/favl/Desktop/quantX/frontend/src/components/iqc/SotaBenchmarkDashboard.tsx', '/Users/favl/Desktop/quantX/frontend/src/components/iqc/InstitutionalBenchmarkDashboard.tsx')
    print("Renamed InstitutionalBenchmarkDashboard.tsx")
except Exception as e:
    print(f"Rename failed: {e}")

try:
    os.rename('/Users/favl/Desktop/quantX/frontend/src/components/nexus/SOTASuperQuantPanel.tsx', '/Users/favl/Desktop/quantX/frontend/src/components/nexus/InstitutionalSuperQuantPanel.tsx')
    print("Renamed InstitutionalSuperQuantPanel.tsx")
except Exception as e:
    print(f"Rename failed: {e}")

print("Mass Refactoring Successful")
