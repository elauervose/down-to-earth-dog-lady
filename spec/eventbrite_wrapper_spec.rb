require "spec_helper"
require "./lib/eventbrite_wrapper"

describe EventbriteWrapper do
  subject { described_class.instance }

  it "can search" do
    subject
    expect(Eventbrite.token).to_not be_nil
  end

  it "gets recent photos" do
    expect(subject.events.first.id).to_not be_empty
  end
end
