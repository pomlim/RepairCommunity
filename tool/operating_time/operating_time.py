import pandas as pd 
import jinja2, re
from datetime import datetime

def main():
    # Extract data from source to pandas dataframes
    df = pd.read_csv('./shop_detail.csv', header=0)
    op_time = df.to_dict('records')

    # transform data to json file
    dayList = ['mon','tue','wed','thu','fri','sat','sun']
    for op in op_time:
        for day in dayList:
            op['day'] = day
            if op[day] == "หยุด":
                op['start'] = ''
                op['end'] = ''
            else:
                op['start'] = re.search(r'(.+)–(.+)', op[day]).group(1)
                op['end'] = re.search(r'(.+)–(.+)', op[day]).group(2)
                op['start'] = datetime.strptime(op['start'], "%H:%M").strftime("%H:%M:%S")
                op['end'] = datetime.strptime(op['end'], "%H:%M").strftime("%H:%M:%S")

            loader = jinja2.FileSystemLoader(searchpath="./")
            jenv = jinja2.Environment(loader=loader)
            template = jenv.get_template('./time_template.txt')
            jsonOut = template.render(data=op)

            # Load result to data directory
            output_name = "../../datafiles/shopOperatingTime/" + "shop_" + str(op['No']) + "_op_" +  op['day'] +".json"
            f = open(output_name, "w", encoding="utf-8")
            f.write(jsonOut)
            f.close

if __name__ == '__main__':
    main()
