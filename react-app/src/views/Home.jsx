import MediaRow from '../components/MediaRow';
import { useState } from 'react';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const { mediaArray } = useMedia();

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">My Media</h2>

      <table className="w-full border-collapse text-sm">
        <thead className="bg-neutral-800 text-neutral-100">
          <tr>
            <th className="p-4 border border-neutral-700">Thumbnail</th>
            <th className="p-4 border border-neutral-700">Title</th>
            <th className="p-4 border border-neutral-700">Owner</th>
            <th className="p-4 border border-neutral-700">Description</th>
            <th className="p-4 border border-neutral-700">Created</th>
            <th className="p-4 border border-neutral-700">Size</th>
            <th className="p-4 border border-neutral-700">Type</th>
            <th className="p-4 border border-neutral-700">View</th>
          </tr>
        </thead>

        <tbody
          className="
            [&>tr:nth-child(odd)]:bg-neutral-900
            [&>tr:nth-child(even)]:bg-neutral-800

            [&>tr>td]:p-4
            [&>tr>td]:border
            [&>tr>td]:border-neutral-700
            [&>tr>td]:align-middle
            [&>tr>td]:text-center

            [&>tr>td:first-child>img]:w-[260px]
            [&>tr>td:first-child>img]:h-[200px]
            [&>tr>td:first-child>img]:object-cover

            [&>tr>td:last-child>a]:inline-block
            [&>tr>td:last-child>a]:px-2
            [&>tr>td:last-child>a]:py-1
            [&>tr>td:last-child>a]:bg-[#363636]
            [&>tr>td:last-child>a]:text-white
            [&>tr>td:last-child>a]:no-underline
            [&>tr>td:last-child>a:hover]:bg-[#111111]
          "
        >
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
