import ChevronDownIcon from '@/icons/ChevronDownIcon';
import EnIcon from '@/icons/EnIcon';
import IdIcon from '@/icons/IdIcon';
import * as Select from '@radix-ui/react-select';
import React from 'react';


const languages = [
    { "value": "id", "label": "Indonesia", "flag": <IdIcon className='w-[32px] h-[24px] rounded p-[1px] bg-slate-200 shadow-xl' /> },
    { "value": "en", "label": "English", "flag": <EnIcon className='w-[32px] h-[24px] rounded p-[1px] bg-slate-200 shadow-xl' /> }
]

const LocaleSwitcher = () => {

    const [value, setValue] = React.useState('id');

    const [open, setOpen] = React.useState(false);

    const onValueChange = (value: string) => {
        setValue(value);
    }

    const getFlag = () => {
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].value === value) {
                return languages[i].flag
            }
        }

        return '-';
    }

    return (
        <Select.Root value={value} onValueChange={onValueChange} open={open} onOpenChange={setOpen}>
            <Select.Trigger
                className={`inline-flex items-center justify-center leading-none gap-[8px] p-2 outline-none rounded ${open ? 'bg-slate-200' : 'bg-transparent'}`}
                aria-label="Languages">
                <Select.Value aria-label={value}>
                    {getFlag()}
                </Select.Value>
                <Select.Icon>
                    <ChevronDownIcon className='w-[12px] h-[12px] text-slate-800' />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content position="popper" align='end' sideOffset={2} sticky='always' className="w-[100%] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                    <Select.Viewport className="w-full p-[5px]">
                        {
                            languages.map((language) => {
                                return <SelectItem key={language.value} value={language.value}>
                                    <div className='flex justify-start items-center gap-3'>{language.flag} {language.label}</div>
                                </SelectItem>
                            })
                        }
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(({ children, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className='leading-none rounded-[3px] p-2 select-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-200'
            {...props}
            ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
        </Select.Item>
    );
});

export default LocaleSwitcher;